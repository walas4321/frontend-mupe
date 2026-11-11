export class NumberUtils {
    static formatNumber(value: any, decimals: number = 2): string {
      if (value === null || value === undefined || value === 0) {
        return '0'.padEnd(decimals + 2, '0'); // Agrega decimales al 0 inicial
      }
      
      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
      
      return formatter.format(value);
    }

   }