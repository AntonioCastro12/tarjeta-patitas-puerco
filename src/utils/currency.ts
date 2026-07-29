const mxnFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});

export const formatCurrency = (value: number) =>
  `${mxnFormatter.format(value)} MXN`;
