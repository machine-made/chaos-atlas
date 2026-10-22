import { DataTheme } from '@/lib/themes/data-themes';

export interface ExportOptions {
  mode: 'clean' | 'academic';
  width?: number;
  height?: number;
  quality?: number;
  filename?: string;
  includeMetadata?: boolean;
  backgroundColor?: string;
  title?: string;
  subtitle?: string;
  dpi?: number;
}

export interface PlotMetadata {
  title: string;
  subtitle?: string;
  mapType: string;
  parameters: Record<string, any>;
  theme: string;
  timestamp: Date;
  iterations?: number;
  bounds?: {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
}

export class PlotExporter {
  private svgElement: SVGSVGElement;
  private metadata: PlotMetadata;

  constructor(svgElement: SVGSVGElement, metadata: PlotMetadata) {
    this.svgElement = svgElement;
    this.metadata = metadata;
  }

  /**
   * Export SVG as PNG with specified options
   */
  async exportPNG(options: ExportOptions = { mode: 'academic' }): Promise<void> {
    const {
      mode = 'academic',
      width = 1920,
      height = 1080,
      quality = 0.95,
      filename = this.generateFilename(),
      includeMetadata = true,
      dpi = 300,
    } = options;

    try {
      // Create a clone of the SVG for manipulation
      const svgClone = this.svgElement.cloneNode(true) as SVGSVGElement;

      // Prepare SVG based on export mode
      const processedSVG = await this.prepareSVGForExport(svgClone, mode, width, height);

      // Convert SVG to canvas
      const canvas = await this.svgToCanvas(processedSVG, width, height, dpi);

      // Convert canvas to blob and download
      canvas.toBlob(
        (blob) => {
          if (blob) {
            this.downloadBlob(blob, filename, includeMetadata);
          }
        },
        'image/png',
        quality
      );
    } catch (error) {
      console.error('Export failed:', error);
      throw new Error(`Failed to export PNG: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Prepare SVG for export based on mode
   */
  private async prepareSVGForExport(
    svg: SVGSVGElement,
    mode: 'clean' | 'academic',
    width: number,
    height: number
  ): Promise<SVGSVGElement> {
    // Set SVG dimensions
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    if (mode === 'clean') {
      return this.prepareCleanPlot(svg, width, height);
    } else {
      return this.prepareAcademicPlot(svg, width, height);
    }
  }

  /**
   * Prepare clean plot (data only, no axes or labels)
   */
  private prepareCleanPlot(svg: SVGSVGElement, width: number, height: number): SVGSVGElement {
    // Remove axes, labels, and UI elements
    const elementsToRemove = [
      '[data-axis="x"]',
      '[data-axis="y"]',
      '[data-label]',
      '[data-annotation]',
      '[data-control]',
      '[data-ui]',
      '.axis-label',
      '.tick-label',
      '.grid-line',
      '.border',
      '.control-panel',
      '.zoom-controls',
      '.transform-info',
    ];

    elementsToRemove.forEach(selector => {
      const elements = svg.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // Set transparent background
    svg.style.backgroundColor = 'transparent';

    // Center the data in the canvas
    const dataGroup = svg.querySelector('g[data-data="true"]') || svg.querySelector('g');
    if (dataGroup) {
      const bbox = (dataGroup as SVGGElement).getBBox();
      const scaleX = width / (bbox.width + 100); // Add padding
      const scaleY = height / (bbox.height + 100);
      const scale = Math.min(scaleX, scaleY);

      const centerX = width / 2 - (bbox.x + bbox.width / 2) * scale;
      const centerY = height / 2 - (bbox.y + bbox.height / 2) * scale;

      dataGroup.setAttribute('transform', `translate(${centerX}, ${centerY}) scale(${scale})`);
    }

    return svg;
  }

  /**
   * Prepare academic plot (with axes, labels, annotations)
   */
  private prepareAcademicPlot(svg: SVGSVGElement, width: number, height: number): SVGSVGElement {
    // Set white background for academic plots
    svg.style.backgroundColor = '#ffffff';

    // Remove UI controls but keep axes and labels
    const elementsToRemove = [
      '[data-control]',
      '[data-ui]',
      '.control-panel',
      '.zoom-controls',
      '.transform-info',
      '.interactive-overlay',
    ];

    elementsToRemove.forEach(selector => {
      const elements = svg.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // Ensure academic styling
    const style = document.createElement('style');
    style.textContent = `
      .axis-line { stroke: #333333; stroke-width: 2; fill: none; }
      .grid-line { stroke: #e0e0e0; stroke-width: 1; fill: none; stroke-dasharray: 2,2; }
      .tick-label { font-family: Arial, sans-serif; font-size: 14px; fill: #333333; }
      .axis-label { font-family: Arial, sans-serif; font-size: 16px; fill: #333333; font-weight: bold; }
      .title { font-family: Arial, sans-serif; font-size: 20px; fill: #333333; font-weight: bold; }
      .subtitle { font-family: Arial, sans-serif; font-size: 14px; fill: #666666; }
      .annotation { font-family: Arial, sans-serif; font-size: 12px; fill: #666666; }
    `;
    svg.insertBefore(style, svg.firstChild);

    return svg;
  }

  /**
   * Convert SVG to HTML canvas
   */
  private async svgToCanvas(svg: SVGSVGElement, width: number, height: number, dpi: number): Promise<HTMLCanvasElement> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    // Set canvas size accounting for DPI
    const scale = dpi / 96; // 96 DPI is default
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Scale context for high DPI
    ctx.scale(scale, scale);

    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Clear canvas and draw image
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Clean up
        URL.revokeObjectURL(svgUrl);
        resolve(canvas);
      };
      img.onerror = () => {
        URL.revokeObjectURL(svgUrl);
        reject(new Error('Failed to load SVG as image'));
      };
      img.src = svgUrl;
    });
  }

  /**
   * Generate filename based on metadata
   */
  private generateFilename(): string {
    const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const mapType = this.metadata.mapType.toLowerCase().replace(/\s+/g, '_');
    const mode = 'academic'; // Default mode
    return `${mapType}_${timestamp}_${mode}.png`;
  }

  /**
   * Download blob as file with optional metadata
   */
  private downloadBlob(blob: Blob, filename: string, includeMetadata: boolean): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    // Add metadata if supported
    if (includeMetadata && 'showSaveFilePicker' in window) {
      const metadata = {
        title: this.metadata.title,
        subject: `Chaotic Map: ${this.metadata.mapType}`,
        creator: 'Chaos Atlas',
        description: `${this.metadata.title} - ${this.metadata.parameters}`,
        keywords: ['chaos', 'dynamical systems', this.metadata.mapType.toLowerCase()],
        created: this.metadata.timestamp.toISOString(),
      };

      // Note: File System Access API support varies
      // Fallback to regular download if not supported
    }

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Export SVG as vector file
   */
  async exportSVG(options: Partial<ExportOptions> = {}): Promise<void> {
    const {
      filename = this.generateFilename().replace('.png', '.svg'),
      includeMetadata = true,
    } = options;

    try {
      // Clone SVG for export
      const svgClone = this.svgElement.cloneNode(true) as SVGSVGElement;

      // Add metadata as XML comments if requested
      if (includeMetadata) {
        const metadataComment = document.createComment(`
          Chaos Atlas Export
          Title: ${this.metadata.title}
          Map Type: ${this.metadata.mapType}
          Parameters: ${JSON.stringify(this.metadata.parameters, null, 2)}
          Theme: ${this.metadata.theme}
          Export Date: ${this.metadata.timestamp.toISOString()}
        `);
        svgClone.insertBefore(metadataComment, svgClone.firstChild);
      }

      // Serialize SVG to string
      const svgData = new XMLSerializer().serializeToString(svgClone);

      // Create blob and download
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      this.downloadBlob(blob, filename, false);

    } catch (error) {
      console.error('SVG export failed:', error);
      throw new Error(`Failed to export SVG: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Export data as CSV
   */
  async exportCSV(data: Array<{x: number, y: number, [key: string]: any}>): Promise<void> {
    try {
      const headers = Object.keys(data[0] || {});
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => row[header]).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
      const filename = this.generateFilename().replace('.png', '.csv');
      this.downloadBlob(blob, filename, false);

    } catch (error) {
      console.error('CSV export failed:', error);
      throw new Error(`Failed to export CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

/**
 * Create plot exporter instance
 */
export const createPlotExporter = (
  svgElement: SVGSVGElement,
  metadata: PlotMetadata
): PlotExporter => {
  return new PlotExporter(svgElement, metadata);
};

/**
 * Quick export function for common use cases
 */
export const exportPlot = async (
  svgElement: SVGSVGElement,
  metadata: PlotMetadata,
  options?: ExportOptions
): Promise<void> => {
  const exporter = createPlotExporter(svgElement, metadata);
  await exporter.exportPNG(options);
};