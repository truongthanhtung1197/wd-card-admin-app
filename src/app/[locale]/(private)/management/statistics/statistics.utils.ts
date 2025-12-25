import { formatCurrency } from "@/utils/format.util";

// Chart colors constants
export const CHART_COLORS = {
  primary: "#3B82F6",
  secondary: "#10B981",
  accent: "#F59E0B",
  danger: "#EF4444",
  purple: "#8B5CF6",
  pink: "#EC4899",
  indigo: "#6366F1",
  teal: "#14B8A6",
  orange: "#F97316",
  gray: "#6B7280",
} as const;

// All color array for charts with many items
export const ALL_CHART_COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.secondary,
  CHART_COLORS.accent,
  CHART_COLORS.danger,
  CHART_COLORS.purple,
  CHART_COLORS.pink,
  CHART_COLORS.indigo,
  CHART_COLORS.teal,
  CHART_COLORS.orange,
  CHART_COLORS.gray,
] as const;

// Helper function to create complete data with all statuses (including 0)
export const createCompleteData = (
  data: any[],
  allStatuses: string[],
  getLabel: (status: string) => string,
) => {
  const statusMap = new Map<string, number>();
  data?.forEach((item) => {
    statusMap.set(item.status, parseInt(item.total));
  });

  const labels = allStatuses.map((status) => getLabel(status));
  const values = allStatuses.map((status) => statusMap.get(status) || 0);

  return { labels, values };
};

// Helper function to create complete user data
export const createCompleteUserData = (
  data: any[],
  allStatuses: string[],
  getLabel: (status: string) => string,
) => {
  const statusMap = new Map<string, number>();
  data?.forEach((item) => {
    statusMap.set(item.roleName, parseInt(item.total));
  });

  const labels = allStatuses.map((status) => getLabel(status));
  const values = allStatuses.map((status) => statusMap.get(status) || 0);

  return { labels, values };
};

// Helper to normalize data2 array
export const normalizeData2Array = (data2: any) => {
  if (Array.isArray(data2?.expenseByDomainBranch?.data)) {
    return data2.expenseByDomainBranch.data;
  }
  if (data2?.expenseByDomainBranch?.data) {
    return [data2.expenseByDomainBranch.data];
  }
  return [];
};

// Common chart options factory
export const createBarChartOptions = (
  title: string,
  options?: {
    showLegend?: boolean;
    formatter?: (value: any) => string;
    tooltipFormatter?: (context: any) => string;
  },
) => {
  const {
    showLegend = false,
    formatter = (value: any) => value,
    tooltipFormatter,
  } = options || {};

  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: showLegend,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: "bold" as const,
        },
        margin: {
          bottom: 30,
        },
        padding: {
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: tooltipFormatter
            ? (context: any) => tooltipFormatter(context)
            : (context: any) =>
                `${context.label}: ${formatter(context.parsed.y)}`,
        },
      },
      datalabels: {
        display: true,
        color: "#000",
        anchor: "end" as const,
        align: "top" as const,
        offset: 4,
        font: {
          weight: "bold" as const,
          size: 12,
        },
        formatter,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: formatter,
        },
      },
    },
  };
};

// Expense chart options factory
export const createExpenseChartOptions = (title: string) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: "bold" as const,
        },
        margin: {
          bottom: 30,
        },
        padding: {
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.parsed.y.toLocaleString("vi-VN")} VND`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "#000",
        anchor: "end" as const,
        align: "top" as const,
        offset: 4,
        font: {
          weight: "bold" as const,
          size: 12,
        },
        formatter: function (value: any) {
          return value.toLocaleString("vi-VN");
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return value.toLocaleString("vi-VN");
          },
        },
      },
    },
  };
};

// Pie chart options factory
export const createPieChartOptions = (title: string) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let value = context.raw;
            return context.label + ": " + formatCurrency(value);
          },
        },
      },
      datalabels: {
        color: "#000",
        font: {
          weight: "bold" as const,
          size: 14,
        },
        formatter: (value: number) => {
          return formatCurrency(value);
        },
      },
    },
  };
};
