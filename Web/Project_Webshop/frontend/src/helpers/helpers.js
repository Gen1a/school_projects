// Helper functions for React frontend

const helpers = {
    formatPrice : (price) => {
        return '€' + price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '€1,');
    },
    getImageSource : (id) => {
        return '/images/product' + id + '.jpg';
    },
}

export const { formatPrice, getImageSource, getHeartIconSource } = helpers;