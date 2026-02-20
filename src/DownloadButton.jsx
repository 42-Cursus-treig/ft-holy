import { useCallback } from 'react';
import { useReactFlow, getNodesBounds, getViewportForBounds, Panel } from '@xyflow/react';
import { toPng } from 'html-to-image';

function downloadImage(dataUrl) {
  const a = document.createElement('a');
  a.setAttribute('download', 'holy-graph.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const imageWidth = 3840; 
const imageHeight = 2160; 
const backgroundColor = '#020617'; 

function DownloadButton() {
  const { getNodes } = useReactFlow();

  const onClick = useCallback(() => {
    const viewportElem = document.querySelector('.react-flow__viewport');
    const nodes = getNodes();    
    const nodesBounds = getNodesBounds(nodes);
    
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.1,
      2,
      0.1
    );

    toPng(viewportElem, {
      backgroundColor: backgroundColor,
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
      fontEmbedCSS: '', 
      cacheBust: true, 
    }).then(downloadImage);
  }, [getNodes]);

  return (
    <Panel position="top-right">
      <button 
        onClick={onClick} 
        className="bg-slate-800/90 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg backdrop-blur-md border border-slate-600 flex items-center gap-2 transition-colors"
        title="Sauvegarder en image"
      >
       📷 <span className="hidden sm:inline">Sauvegarder</span>
      </button>
    </Panel>
  );
}

export default DownloadButton;