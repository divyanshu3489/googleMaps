declare module '*.png' {
    const value: any;
    export default value;
  }
  
  declare module '*.jpg' {
    const value: any;
    export default value;
  }
  
  declare module '*.jpeg' {
    const value: any;
    export default value;
  }
  
  declare module '*.gif' {
    const value: any;
    export default value;
  }
  
  declare module '*.svg' {
    const value: any;
    export default value;
  }

  declare module '@mapbox/polyline' {
    // Optionally, declare specific types or functions you’ll use
    export function encode(coordinates: number[][], precision?: number): string;
    export function decode(polyline: string, precision?: number): number[][];
  }
  