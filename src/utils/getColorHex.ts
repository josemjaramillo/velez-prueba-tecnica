function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    "Negro": "#000000",
    "Blanco": "#ffffff",
    "Gris": "#808080",
    "Gris Claro": "#d3d3d3",
    "Gris Oscuro": "#404040",
    "Rojo": "#ff0000",
    "Azul": "#0000ff",
    "Azul Oscuro": "#003366",
    "Azul Claro": "#87cefa",
    "Verde": "#008000",
    "Verde Claro": "#90ee90",
    "Amarillo": "#ffff00",
    "Verde Limon": "#ffff00",
    "Naranja": "#ffa500",
    "Café": "#8b4513",
    "Miel": "#8b4513",
    "Beige": "#f5f5dc",
    "Crema": "#fffdd0",
    "Rosado": "#ffc0cb",
    "Morado": "#800080",
    "Mora": "#800080",
  };

  return colorMap[colorName.trim()] || "#cccccc"; // Color por defecto si no se encuentra
}

export default getColorHex;