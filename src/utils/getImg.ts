const getImg = (name: string) => {
	return new URL(`../assets/img/${name}.png`, import.meta.url).href;
};

export default getImg;
