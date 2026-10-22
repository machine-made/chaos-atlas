export interface DataTheme {
  id: string;
  name: string;
  description: string;
  category: 'simple' | 'scientific' | 'artistic' | 'crazy';
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    grid: string;
    text: string;
    axis: string;
    data: string[];
    accent: string[];
  };
}

export const dataThemes: DataTheme[] = [
  // Simple Themes
  {
    id: 'primary',
    name: 'Primary Colors',
    description: 'Clean and simple primary color palette',
    category: 'simple',
    colors: {
      primary: '#3b82f6',
      secondary: '#ef4444',
      tertiary: '#10b981',
      background: '#ffffff',
      grid: '#e5e7eb',
      text: '#374151',
      axis: '#6b7280',
      data: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'],
      accent: ['#dbeafe', '#fee2e2', '#d1fae5', '#fed7aa', '#ede9fe'],
    },
  },
  {
    id: 'grayscale',
    name: 'Grayscale',
    description: 'Professional black and white theme',
    category: 'simple',
    colors: {
      primary: '#000000',
      secondary: '#666666',
      tertiary: '#999999',
      background: '#ffffff',
      grid: '#f0f0f0',
      text: '#333333',
      axis: '#888888',
      data: ['#000000', '#333333', '#666666', '#999999', '#cccccc'],
      accent: ['#f8f8f8', '#f0f0f0', '#e8e8e8', '#e0e0e0', '#d8d8d8'],
    },
  },
  {
    id: 'pastel',
    name: 'Pastel',
    description: 'Soft and gentle pastel colors',
    category: 'simple',
    colors: {
      primary: '#93c5fd',
      secondary: '#fca5a5',
      tertiary: '#86efac',
      background: '#fefefe',
      grid: '#f5f5f5',
      text: '#6b7280',
      axis: '#d1d5db',
      data: ['#93c5fd', '#fca5a5', '#86efac', '#fde047', '#c4b5fd'],
      accent: ['#dbeafe', '#fee2e2', '#d1fae5', '#fef3c7', '#ede9fe'],
    },
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'Maximum contrast for accessibility',
    category: 'simple',
    colors: {
      primary: '#0066cc',
      secondary: '#ff0000',
      tertiary: '#00cc00',
      background: '#ffffff',
      grid: '#cccccc',
      text: '#000000',
      axis: '#666666',
      data: ['#0066cc', '#ff0000', '#00cc00', '#ff6600', '#9900cc'],
      accent: ['#e6f3ff', '#ffe6e6', '#e6ffe6', '#fff5e6', '#f3e6ff'],
    },
  },

  // Scientific Themes
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    description: 'Classic scientific plotting style',
    category: 'scientific',
    colors: {
      primary: '#1f77b4',
      secondary: '#ff7f0e',
      tertiary: '#2ca02c',
      background: '#ffffff',
      grid: '#e0e0e0',
      text: '#333333',
      axis: '#666666',
      data: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
      accent: ['#d4e5f7', '#ffe4d1', '#d4f1d4', '#ffd4d4', '#e6d4f1'],
    },
  },
  {
    id: 'seaborn',
    name: 'Seaborn',
    description: 'Modern statistical visualization palette',
    category: 'scientific',
    colors: {
      primary: '#4c72b0',
      secondary: '#dd8452',
      tertiary: '#55a868',
      background: '#fafafa',
      grid: '#e8e8e8',
      text: '#2c2c2c',
      axis: '#7f7f7f',
      data: ['#4c72b0', '#dd8452', '#55a868', '#c44e52', '#8172b3'],
      accent: ['#e8ecf4', '#f5e8df', '#e8f4ed', '#f5e8e8', '#ebe4f4'],
    },
  },
  {
    id: 'matlab',
    name: 'MATLAB',
    description: 'Engineering and scientific computing style',
    category: 'scientific',
    colors: {
      primary: '#0072bd',
      secondary: '#d95319',
      tertiary: '#edb120',
      background: '#ffffff',
      grid: '#cccccc',
      text: '#333333',
      axis: '#666666',
      data: ['#0072bd', '#d95319', '#edb120', '#7e2f8e', '#77ac30'],
      accent: ['#e6f3ff', '#ffe8d8', '#fff3e6', '#f0e6f7', '#e8f4e6'],
    },
  },
  {
    id: 'scientific-papers',
    name: 'Scientific Papers',
    description: 'Publication-ready color scheme',
    category: 'scientific',
    colors: {
      primary: '#0d47a1',
      secondary: '#c62828',
      tertiary: '#2e7d32',
      background: '#ffffff',
      grid: '#f5f5f5',
      text: '#212121',
      axis: '#616161',
      data: ['#0d47a1', '#c62828', '#2e7d32', '#f57c00', '#6a1b9a'],
      accent: ['#e3f2fd', '#ffebee', '#e8f5e8', '#fff3e0', '#f3e5f5'],
    },
  },

  // Artistic Themes
  {
    id: 'neon-dreams',
    name: 'Neon Dreams',
    description: 'Vibrant neon colors on dark background',
    category: 'artistic',
    colors: {
      primary: '#00ffff',
      secondary: '#ff00ff',
      tertiary: '#ffff00',
      background: '#0a0a0a',
      grid: '#1a1a1a',
      text: '#ffffff',
      axis: '#666666',
      data: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff6600'],
      accent: ['#001a1a', '#1a001a', '#1a1a00', '#001a00', '#1a0a00'],
    },
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Soft flowing watercolor effect',
    category: 'artistic',
    colors: {
      primary: '#7fcdbb',
      secondary: '#feb24c',
      tertiary: '#bcbddc',
      background: '#faf8f5',
      grid: '#f0ebe0',
      text: '#4a5568',
      axis: '#718096',
      data: ['#7fcdbb', '#feb24c', '#bcbddc', '#fc9272', '#c6dbef'],
      accent: ['#e8f6f2', '#fef5e6', '#f0f0f7', '#fee8e6', '#e8f2fe'],
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm sunset color palette',
    category: 'artistic',
    colors: {
      primary: '#ff6b6b',
      secondary: '#feca57',
      tertiary: '#48dbfb',
      background: '#2c2c54',
      grid: '#40407a',
      text: '#f5f5f5',
      axis: '#9ca3af',
      data: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'],
      accent: ['#4a2c2c', '#4a3c2c', '#2c3c4a', '#4a2c3c', '#2c2c4a'],
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Natural forest and earth tones',
    category: 'artistic',
    colors: {
      primary: '#2d5016',
      secondary: '#73a942',
      tertiary: '#aad576',
      background: '#f8f9f4',
      grid: '#e8ede3',
      text: '#3d421c',
      axis: '#6b7328',
      data: ['#2d5016', '#73a942', '#aad576', '#c8e6c9', '#a1887f'],
      accent: ['#f0f4ea', '#e8f3e6', '#f0f8ea', '#f8faf4', '#f3efe8'],
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Deep ocean blues and teals',
    category: 'artistic',
    colors: {
      primary: '#006994',
      secondary: '#13a8ba',
      tertiary: '#5eb3d6',
      background: '#f0f8ff',
      grid: '#e6f3ff',
      text: '#1a3a52',
      axis: '#4a7c9e',
      data: ['#006994', '#13a8ba', '#5eb3d6', '#95e1d3', '#a8e6cf'],
      accent: ['#e6f3f7', '#e6f5f7', '#e8f4f8', '#f0fdfa', '#f0fdf5'],
    },
  },

  // Crazy Themes
  {
    id: 'rainbow-chaos',
    name: 'Rainbow Chaos',
    description: 'Full rainbow spectrum madness',
    category: 'crazy',
    colors: {
      primary: '#ff0000',
      secondary: '#ff7f00',
      tertiary: '#ffff00',
      background: '#000033',
      grid: '#0a0a0a',
      text: '#ffffff',
      axis: '#666666',
      data: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'],
      accent: ['#330000', '#331a00', '#333300', '#003300', '#000033', '#1a0033', '#330033'],
    },
  },
  {
    id: 'glitch',
    name: 'Glitch',
    description: 'Digital error and corruption aesthetic',
    category: 'crazy',
    colors: {
      primary: '#ff00ff',
      secondary: '#00ffff',
      tertiary: '#ffff00',
      background: '#000000',
      grid: '#ff00ff20',
      text: '#00ff00',
      axis: '#ff0000',
      data: ['#ff00ff', '#00ffff', '#ffff00', '#ff0080', '#80ff00', '#00ff80', '#8000ff'],
      accent: ['#ff00ff10', '#00ffff10', '#ffff0010', '#ff008010', '#80ff0010', '#00ff8010', '#8000ff10'],
    },
  },
  {
    id: 'vaporwave',
    name: 'Vaporwave',
    description: 'Retro 80s synthwave aesthetic',
    category: 'crazy',
    colors: {
      primary: '#ff6ec7',
      secondary: '#7873f5',
      tertiary: '#4fc3f7',
      background: '#1a0033',
      grid: '#2d1b69',
      text: '#ffccff',
      axis: '#b388ff',
      data: ['#ff6ec7', '#7873f5', '#4fc3f7', '#64ffda', '#7c4dff', '#ff4081', '#18ffff'],
      accent: ['#4d0066', '#2d1b4d', '#1a0d33', '#3d2d5e', '#4a2d5e', '#660033', '#003366'],
    },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Future tech noir color scheme',
    category: 'crazy',
    colors: {
      primary: '#00ff41',
      secondary: '#ff0080',
      tertiary: '#00ffff',
      background: '#0a0a0a',
      grid: '#1a1a1a',
      text: '#00ff41',
      axis: '#ff0080',
      data: ['#00ff41', '#ff0080', '#00ffff', '#ffff00', '#ff00ff', '#ff4500', '#32cd32'],
      accent: ['#001a00', '#1a001a', '#001a1a', '#1a1a00', '#1a001a', '#1a0a00', '#003300'],
    },
  },
  {
    id: 'unicorn',
    name: 'Unicorn',
    description: 'Magical pastel rainbow fantasy',
    category: 'crazy',
    colors: {
      primary: '#ff69b4',
      secondary: '#da70d6',
      tertiary: '#87ceeb',
      background: '#ffe4f1',
      grid: '#ffd4e5',
      text: '#8b008b',
      axis: '#ba55d3',
      data: ['#ff69b4', '#da70d6', '#87ceeb', '#98fb98', '#f0e68c', '#ffa07a', '#dda0dd'],
      accent: ['#ffe4f1', '#faf0ff', '#f0ffff', '#f0fff0', '#fffff0', '#fff5ee', '#faf0e6'],
    },
  },
];

export const getDataTheme = (themeId: string): DataTheme => {
  const theme = dataThemes.find(t => t.id === themeId);
  return theme || dataThemes[0]; // Default to first theme if not found
};

export const getDataThemesByCategory = (category: DataTheme['category']) => {
  return dataThemes.filter(theme => theme.category === category);
};

export const getRandomDataTheme = (): DataTheme => {
  return dataThemes[Math.floor(Math.random() * dataThemes.length)];
};