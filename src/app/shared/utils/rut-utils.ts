export function formatRut(value: string): string {
    const cleanValue = value.replace(/[^0-9kK]/g, '').toLowerCase();
  
    const rutBody = cleanValue.slice(0, -1);
    const dv = cleanValue.slice(-1);
  
    const formattedBody = rutBody.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    return `${formattedBody}-${dv}`;
  }