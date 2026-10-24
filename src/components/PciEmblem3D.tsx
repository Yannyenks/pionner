import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface PciEmblem3DProps {
  className?: string;
  interactive?: boolean;
}

export const PciEmblem3D: React.FC<PciEmblem3DProps> = ({ className = '', interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const isPausedRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
    if (!gl) {
      setWebGlSupported(false);
      return;
    }

    const isSoftwareGl = (() => {
      try {
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : (gl as WebGLRenderingContext).RENDERER;
        const gpu = String(gl.getParameter(param));
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Studio Environment map via RoomEnvironment
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch (e) {
      console.warn('RoomEnvironment fallback', e);
    }

    // Studio Lighting
    const keyLight = new THREE.DirectionalLight(0xfff6e5, 2.6);
    keyLight.position.set(4, 5, 5);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
    }
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x9bd8b5, 1.8);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0xfff8ed, 0x064e35, 1.2);
    scene.add(hemiLight);

    // Master Emblem Group
    const emblemGroup = new THREE.Group();
    scene.add(emblemGroup);

    // Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.22,
    });

    const emeraldMaterial = new THREE.MeshStandardMaterial({
      color: 0x087747,
      metalness: 0.65,
      roughness: 0.35,
    });

    const deepGreenPlateMaterial = new THREE.MeshStandardMaterial({
      color: 0x064e35,
      metalness: 0.8,
      roughness: 0.4,
    });

    const champagneMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5e6c8,
      metalness: 0.92,
      roughness: 0.18,
    });

    // 1. Central Medallion Base Disc (Backplate)
    const basePlateGeo = new THREE.CylinderGeometry(2.35, 2.35, 0.18, 64);
    basePlateGeo.rotateX(Math.PI / 2);
    const basePlate = new THREE.Mesh(basePlateGeo, deepGreenPlateMaterial);
    emblemGroup.add(basePlate);

    // 2. Beveled Inner Ring
    const innerRingGeo = new THREE.TorusGeometry(2.1, 0.08, 16, 64);
    const innerRing = new THREE.Mesh(innerRingGeo, goldMaterial);
    innerRing.position.z = 0.12;
    emblemGroup.add(innerRing);

    // 3. Laurel Wreath Leaves (Circular crown of honor)
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.quadraticCurveTo(0.12, 0.3, 0, 0.6);
    leafShape.quadraticCurveTo(-0.12, 0.3, 0, 0);

    const extrudeSettings = { depth: 0.04, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.015, bevelThickness: 0.015 };
    const leafGeo = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);
    leafGeo.center();

    const wreathGroup = new THREE.Group();
    const leafCount = 18;
    const radius = 2.45;

    for (let i = 0; i < leafCount; i++) {
      // Left branch
      const angleLeft = -Math.PI / 2 + 0.3 + (i / leafCount) * (Math.PI - 0.6);
      const meshLeft = new THREE.Mesh(leafGeo, goldMaterial);
      meshLeft.position.set(Math.cos(angleLeft) * radius, Math.sin(angleLeft) * radius, 0.15);
      meshLeft.rotation.z = angleLeft + Math.PI / 2 - 0.35;
      meshLeft.scale.set(0.65, 0.65, 0.65);
      wreathGroup.add(meshLeft);

      // Right branch
      const angleRight = Math.PI / 2 + 0.3 + (i / leafCount) * (Math.PI - 0.6);
      const meshRight = new THREE.Mesh(leafGeo, goldMaterial);
      meshRight.position.set(Math.cos(angleRight) * radius, Math.sin(angleRight) * radius, 0.15);
      meshRight.rotation.z = angleRight + Math.PI / 2 + 0.35;
      meshRight.scale.set(0.65, 0.65, 0.65);
      wreathGroup.add(meshRight);
    }
    emblemGroup.add(wreathGroup);

    // 4. 24 Nodes Ring: Symbol of the 24 members in a Globale Classe
    const nodesGroup = new THREE.Group();
    const nodeSphereGeo = new THREE.SphereGeometry(0.06, 16, 16);
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const node = new THREE.Mesh(nodeSphereGeo, champagneMaterial);
      node.position.set(Math.cos(angle) * 1.85, Math.sin(angle) * 1.85, 0.16);
      nodesGroup.add(node);
    }
    emblemGroup.add(nodesGroup);

    // 5. Dimensional Letter "P" sculpted in center
    const pGroup = new THREE.Group();
    const pStemGeo = new THREE.BoxGeometry(0.32, 1.8, 0.28);
    const pStem = new THREE.Mesh(pStemGeo, champagneMaterial);
    pStem.position.set(-0.45, 0.05, 0.22);
    pGroup.add(pStem);

    // P Loop (Torus segment)
    const pLoopGeo = new THREE.TorusGeometry(0.52, 0.15, 24, 48, Math.PI * 1.25);
    const pLoop = new THREE.Mesh(pLoopGeo, champagneMaterial);
    pLoop.position.set(-0.35, 0.45, 0.22);
    pLoop.rotation.z = -Math.PI / 2;
    pGroup.add(pLoop);

    // Decorative Serif foot for the P
    const pFootGeo = new THREE.BoxGeometry(0.6, 0.15, 0.28);
    const pFoot = new THREE.Mesh(pFootGeo, champagneMaterial);
    pFoot.position.set(-0.45, -0.85, 0.22);
    pGroup.add(pFoot);

    // Top serif
    const pTopFoot = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.28), champagneMaterial);
    pTopFoot.position.set(-0.48, 0.95, 0.22);
    pGroup.add(pTopFoot);

    emblemGroup.add(pGroup);

    // 6. Fine outer orbital connector rings (subtly tilted)
    const orbitRingGeo = new THREE.TorusGeometry(2.9, 0.025, 16, 80);
    const orbitRing1 = new THREE.Mesh(orbitRingGeo, goldMaterial);
    orbitRing1.rotation.x = Math.PI / 4;
    orbitRing1.rotation.y = 0.2;
    emblemGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(orbitRingGeo, emeraldMaterial);
    orbitRing2.rotation.x = -Math.PI / 5;
    orbitRing2.rotation.y = -0.3;
    emblemGroup.add(orbitRing2);

    // 7. Soft ground contact shadow plane
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 5, 64, 64, 60);
      grad.addColorStop(0, 'rgba(6, 78, 53, 0.35)');
      grad.addColorStop(0.5, 'rgba(8, 119, 71, 0.12)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(canvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -3.2, -0.5);
    shadowMesh.rotation.x = -Math.PI / 2.2;
    scene.add(shadowMesh);

    // Interactive pointer handling
    let targetRotX = 0;
    let targetRotY = 0;
    let targetRotZ = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.45;
    };

    container.addEventListener('pointermove', handlePointerMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (!isPausedRef.current) {
        // Continuous slow elegant spin
        emblemGroup.rotation.y = THREE.MathUtils.damp(emblemGroup.rotation.y, targetRotY + time * 0.25, 3.5, delta);
        emblemGroup.rotation.x = THREE.MathUtils.damp(emblemGroup.rotation.x, targetRotX + Math.sin(time * 0.8) * 0.08, 3.5, delta);
        emblemGroup.position.y = Math.sin(time * 1.2) * 0.1;

        // Counter-rotation of decorative orbital rings
        orbitRing1.rotation.z = time * 0.15;
        orbitRing2.rotation.z = -time * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 400;
      const newH = container.clientHeight || 400;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);

      // Disposal
      renderer.dispose();
      basePlateGeo.dispose();
      innerRingGeo.dispose();
      leafGeo.dispose();
      nodeSphereGeo.dispose();
      pStemGeo.dispose();
      pLoopGeo.dispose();
      pFootGeo.dispose();
      pTopFoot.geometry.dispose();
      orbitRingGeo.dispose();
      shadowGeo.dispose();
      shadowTexture.dispose();
      goldMaterial.dispose();
      emeraldMaterial.dispose();
      deepGreenPlateMaterial.dispose();
      champagneMaterial.dispose();
      shadowMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  if (!webGlSupported) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#064E35] to-[#087747] text-white rounded-2xl border border-[#C9A65A]/40 shadow-xl ${className}`}>
        <div className="w-36 h-36 rounded-full border-2 border-[#C9A65A] bg-[#064E35] flex items-center justify-center shadow-lg relative">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#C9A65A" strokeWidth="1" strokeDasharray="3 3" />
            <text x="50" y="62" textAnchor="middle" fill="#FFFFFF" fontSize="36" fontFamily="Cinzel, serif" fontWeight="bold">
              P
            </text>
          </svg>
        </div>
        <p className="mt-4 font-display text-sm tracking-wider uppercase text-[#C9A65A] font-bold">Pionnier Club International</p>
        <p className="text-[11px] text-stone-200 mt-1">Le leadership au service de la famille</p>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div ref={containerRef} className="w-full h-full min-h-[380px] cursor-grab active:cursor-grabbing" />

      {/* Floating Collapsible Micro-Dock (Zero viewport occlusion) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-stone-200/80 shadow-xs text-xs text-stone-600">
        <span className="font-medium text-[#087747]">Emblème 3D PCI</span>
        <span className="text-stone-300">·</span>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="hover:text-stone-900 transition-colors cursor-pointer"
        >
          {isPaused ? 'Reprendre rotation' : 'Fixer la vue'}
        </button>
      </div>
    </div>
  );
};
