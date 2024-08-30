declare module "react-image-zoom" {
  interface ReactImageZoomProps {
    img: string;
    zoomWidth: number;
    height: number;
    zoomPosition: "original" | "inside" | "right" | "bottom";
  }

  const ReactImageZoom: React.FC<ReactImageZoomProps>;

  export default ReactImageZoom;
}
