import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";
import { SkeletonUtils } from "three-stdlib";

type ActionName =
  | "static"
  | "idle"
  | "walk"
  | "sprint"
  | "jump"
  | "fall"
  | "crouch"
  | "sit"
  | "drive"
  | "die"
  | "pick-up"
  | "emote-yes"
  | "emote-no"
  | "holding-right"
  | "holding-left"
  | "holding-both"
  | "holding-right-shoot"
  | "holding-left-shoot"
  | "holding-both-shoot"
  | "attack-melee-right"
  | "attack-melee-left"
  | "attack-kick-right"
  | "attack-kick-left"
  | "interact-right"
  | "interact-left"
  | "wheelchair-sit"
  | "wheelchair-look-left"
  | "wheelchair-look-right"
  | "wheelchair-move-forward"
  | "wheelchair-move-back"
  | "wheelchair-move-left"
  | "wheelchair-move-right";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    ["body-mesh"]: THREE.SkinnedMesh;
    ["head-mesh"]: THREE.SkinnedMesh;
    root: THREE.Bone;
  };
  materials: {
    colormap: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export function Character(props: React.JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF("/models/character.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const { nodes, materials } = useGraph(clone) as unknown as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <group name="character-male-c">
        <group name="character-male-c_1">
          <primitive object={nodes.root} />
          <skinnedMesh
            name="body-mesh"
            geometry={nodes["body-mesh"].geometry}
            material={materials.colormap}
            skeleton={nodes["body-mesh"].skeleton}
          />
          <skinnedMesh
            name="head-mesh"
            geometry={nodes["head-mesh"].geometry}
            material={materials.colormap}
            skeleton={nodes["head-mesh"].skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/character.glb");
