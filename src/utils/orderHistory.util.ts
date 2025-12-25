import { ORDER_HISTORY_TYPE } from "@/store/Apis/Order.api";

export const formatFullDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
};

export const getHistoryIconColor = (type: ORDER_HISTORY_TYPE) => {
    const colorMap = {
        [ORDER_HISTORY_TYPE.CREATE_ORDER]: "text-green-600",
        [ORDER_HISTORY_TYPE.CHANGE_STATUS]: "text-blue-600",
        [ORDER_HISTORY_TYPE.PRICE_ADJUSTMENT]: "text-orange-600",
        [ORDER_HISTORY_TYPE.REMOVE_ORDER_DETAIL]: "text-red-600",
    };
    return colorMap[type] || "text-gray-600";
};

export const calculatePaginationInfo = (currentPage: number, limit: number, total: number) => {
    const start = ((currentPage - 1) * limit) + 1;
    const end = Math.min(currentPage * limit, total);
    const totalPages = Math.ceil(total / limit);

    return { start, end, totalPages };
};

export const generatePageNumbers = (currentPage: number, totalPages: number, maxVisible = 5) => {
    if (totalPages <= maxVisible) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return Array.from({ length: maxVisible }, (_, i) => i + 1);
    }

    if (currentPage >= totalPages - 2) {
        return Array.from({ length: maxVisible }, (_, i) => totalPages - maxVisible + 1 + i);
    }

    return Array.from({ length: maxVisible }, (_, i) => currentPage - 2 + i);
};
