// Router 초안: 프레임워크없는 프론트엔드개발
const checkRoutes = (routes) => {
	const currentRoutes = routes.find((route) => route.url === window.location.hash);

	if (!currentRoutes) {
		return;
	}

	return currentRoutes.pageComponent();
};

const createRouter = () => {
	const router = {};

	const routes = [];

	router.addRoute = (url, pageComponent) => {
		routes.push({
			url,
			pageComponent,
		});

		return router;
	};

	router.go = (url) => {
		window.location.hash = url;
	};

	router.start = () => {
		window.addEventListener('hashchange', checkRoutes);

		if (!window.location.hash) {
			indow.location.hash = '#/';
		}

		checkRoutes(routes);
	};

	return router;
};

export default createRouter;
