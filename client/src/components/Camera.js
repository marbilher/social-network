import React, {useRef} from 'react';
import '../App.css';
import * as posenet_module from '../../node_modules/@tensorflow-models/posenet';
import * as facemesh_module from '../../node_modules/@tensorflow-models/facemesh';
import * as tf from '../../node_modules/@tensorflow/tfjs';
import * as paper from '../../node_modules/paper';
import dat from '../../node_modules/dat.gui';
import Stats from '../../node_modules/stats.js';
import "../../node_modules/babel-polyfill";

import {drawKeypoints, drawPoint, drawSkeleton, isMobile, toggleLoadingUI, setStatusText} from '../animation/utils/demoUtils.js';
import {SVGUtils} from '../animation/utils/svgUtils.js'
import {PoseIllustration} from '../animation/illustrationGen/illustration.js';
import {Skeleton, facePartName2Index} from '../animation/illustrationGen/skeleton.js';
import {FileUtils} from '../animation/utils/fileUtils.js';

import girlSVG from '../animation/resources/illustration/girl.svg';
import boySVG from '../animation/resources/illustration/boy.svg';
import abstractSVG from '../animation/resources/illustration/abstract.svg';
import blathersSVG from '../animation/resources/illustration/blathers.svg';
import tomNookSVG from '../animation/resources/illustration/tom-nook.svg';

function Camera() {



let video;
let videoWidth = 300;
let videoHeight = 300;

// Canvas
let faceDetection = null;
let illustration = null;
let canvasScope;
let canvasWidth = 800;
let canvasHeight = 800;

// ML models
let facemesh;
let posenet;
let minPoseConfidence = 0.15;
let minPartConfidence = 0.1;
let nmsRadius = 30.0;

// Misc
let mobile = false;
const stats = new Stats();

const avatarSvgs = {
  'girl': girlSVG,
  'boy': boySVG,
  'abstract': abstractSVG,
  'blathers': blathersSVG,
  'tom-nook': tomNookSVG
};

/**
 * Loads a the camera to be used in the demo
 *
 */
async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  const video = document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;

  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: videoWidth,
      height: videoHeight,
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo() {
  const video = await setupCamera();
  video.play();

  return video;
}

const defaultPoseNetArchitecture = 'MobileNetV1';
const defaultQuantBytes = 2;
const defaultMultiplier = 1.0;
const defaultStride = 16;
const defaultInputResolution = 200;

const guiState = {
  avatarSVG: Object.keys(avatarSvgs)[0],
  debug: {
    showDetectionDebug: true,
    showIllustrationDebug: false,
  },
};

/**
 * Sets up dat.gui controller on the top-right of the window
 */
function setupGui(cameras) {

  if (cameras.length > 0) {
    guiState.camera = cameras[0].deviceId;
  }

  const gui = new dat.GUI({width: 300});

  let multi = gui.addFolder('Image');
  console.log(guiState.avatarSVG)
  gui.add(guiState, 'avatarSVG', Object.keys(avatarSvgs)).onChange(() => parseSVG(avatarSvgs[guiState.avatarSVG]));
  multi.open();

  let output = gui.addFolder('Debug control');
  output.add(guiState.debug, 'showDetectionDebug');
  output.add(guiState.debug, 'showIllustrationDebug');
  output.open();
}

/**
 * Sets up a frames per second panel on the top-left of the window
 */
function setupFPS() {
  stats.showPanel(0);  // 0: fps, 1: ms, 2: mb, 3+: custom
  document.getElementById('main').appendChild(stats.dom);
}

/**
 * Feeds an image to posenet to estimate poses - this is where the magic
 * happens. This function loops with a requestAnimationFrame method.
 */
let outputCanvas = useRef(null)

function detectPoseInRealTime(video) {
  // const canvas = document.getElementById('output');
  const keypointCanvas = document.getElementById('keypoints');
  // console.log(outputCanvas.current.getContext('2d'))
  const videoCtx = outputCanvas.current.getContext('2d');
  const keypointCtx = keypointCanvas.getContext('2d');

  // outputCanvas.width = videoWidth;
  // outputCanvas.height = videoHeight;
  keypointCanvas.width = videoWidth;
  keypointCanvas.height = videoHeight;

  async function poseDetectionFrame() {
    // Begin monitoring code for frames per second
    stats.begin();

    let poses = [];
   
    videoCtx.clearRect(0, 0, videoWidth, videoHeight);
    // Draw video
    videoCtx.save();
    videoCtx.scale(-1, 1);
    videoCtx.translate(-videoWidth, 0);
    videoCtx.drawImage(video, 0, 0, videoWidth, videoHeight);
    videoCtx.restore();

    // Creates a tensor from an image
    const input = tf.browser.fromPixels(outputCanvas.current);
    faceDetection = await facemesh.estimateFaces(input, false, false);
    let all_poses = await posenet.estimatePoses(video, {
      flipHorizontal: true,
      decodingMethod: 'multi-person',
      maxDetections: 1,
      scoreThreshold: minPartConfidence,
      nmsRadius: nmsRadius
    });

    poses = poses.concat(all_poses);
    input.dispose();

    keypointCtx.clearRect(0, 0, videoWidth, videoHeight);
    if (guiState.debug.showDetectionDebug) {
      poses.forEach(({score, keypoints}) => {
      if (score >= minPoseConfidence) {
          drawKeypoints(keypoints, minPartConfidence, keypointCtx);
          drawSkeleton(keypoints, minPartConfidence, keypointCtx);
        }
      });
      faceDetection.forEach(face => {
        Object.values(facePartName2Index).forEach(index => {
            let p = face.scaledMesh[index];
            drawPoint(keypointCtx, p[1], p[0], 2, 'red');
        });
      });
    }

    canvasScope.project.clear();

    if (poses.length >= 1 && illustration) {
      Skeleton.flipPose(poses[0]);

      if (faceDetection && faceDetection.length > 0) {
        let face = Skeleton.toFaceFrame(faceDetection[0]);
        illustration.updateSkeleton(poses[0], face);
      } else {
        illustration.updateSkeleton(poses[0], null);
      }
      illustration.draw(canvasScope, videoWidth, videoHeight);

      if (guiState.debug.showIllustrationDebug) {
        illustration.debugDraw(canvasScope);
      }
    }

    canvasScope.project.activeLayer.scale(
      canvasWidth / videoWidth, 
      canvasHeight / videoHeight, 
      new canvasScope.Point(0, 0));

    // End monitoring code for frames per second
    stats.end();

    requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
}
let illustrationCanvas = useRef(null)

function setupCanvas() {
  mobile = isMobile();
  if (mobile) {
    canvasWidth = Math.min(window.innerWidth, window.innerHeight);
    canvasHeight = canvasWidth;
    videoWidth *= 0.7;
    videoHeight *= 0.7;
  }  

  canvasScope = paper.default;
  
//   let canvas = document.querySelector('.illustration-canvas');;  //useRef
//   canvas.width = canvasWidth;                                    //constrain to chat window
//   canvas.height = canvasHeight;
  console.log(canvasScope)    
  console.log(illustrationCanvas.current)                
  canvasScope.setup(illustrationCanvas.current);  //potential problem here
}

/**
 * Kicks off the demo by loading the posenet model, finding and loading
 * available camera devices, and setting off the detectPoseInRealTime function.
 */
async function bindPage() {
  setupCanvas();

//   toggleLoadingUI(true);
//   setStatusText('Loading PoseNet model...');
  posenet = await posenet_module.load({
    architecture: defaultPoseNetArchitecture,
    outputStride: defaultStride,
    inputResolution: defaultInputResolution,
    multiplier: defaultMultiplier,
    quantBytes: defaultQuantBytes
  });
  setStatusText('Loading FaceMesh model...');
  facemesh = await facemesh_module.load();

  setStatusText('Loading Avatar file...');
  let t0 = new Date();
  console.log(avatarSvgs.boy)   //not importing svg correctly
  await parseSVG(Object.values(avatarSvgs)[0]);

  setStatusText('Setting up camera...');
  try {
    video = await loadVideo();
  } catch (e) {
    let info = document.getElementById('info');
    info.textContent = 'this device type is not supported yet, ' +
      'or this browser does not support video capture: ' + e.toString();
    info.style.display = 'block';
    throw e;
  }

  setupGui([], posenet);
  setupFPS();
  
  toggleLoadingUI(false);
  detectPoseInRealTime(video, posenet);
}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
FileUtils.setDragDropHandler((result) => {parseSVG(result)});

async function parseSVG(target) {
  console.log(target)
  let svgScope = await SVGUtils.importSVG(target /* SVG string or file path */);
  let skeleton = new Skeleton(svgScope);
  illustration = new PoseIllustration(canvasScope);
  illustration.bindSkeleton(skeleton, svgScope);
}
  
bindPage();

return (
    <div>
    <div id="info" style={{display:'none'}}>
    </div>
    <div id="loading" style={{position: 'relative', left: 0}}>
        <span className="spinner-text" id="status">
            Loading PoseNet model...
        </span>
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
    <div className="canvas-container">
        <div id='main' style={{display:'none'}}>
            <video id="video" 
            playsInline 
            >
            </video>
            <canvas id="output" ref={outputCanvas} className="camera-canvas"></canvas>
            <canvas id="keypoints" className="camera-canvas"></canvas>
        </div>
        <canvas style={{width:'100%', height:'100%'}} className="illustration-canvas" ref={illustrationCanvas}></canvas>
    </div>
    <div className="footer">
        <div className="footer-text">
          <p>
            Pose Animator runs TF.js <strong>FaceMesh</strong> and <strong>PoseNet</strong> models to animate SVG illustrations with camera feed / static images.<br/>
            It currently supports <strong>single-pose</strong>, <strong>single-face</strong> detection, and has been tested on Destkop Chrome & iOS Safari.
            <br/>
            (PoseNet model config - MobileNetV1, output stride 16, quant bytes 2)
          </p>
        </div>
      </div>
    </div>  
    );
}

export default Camera;