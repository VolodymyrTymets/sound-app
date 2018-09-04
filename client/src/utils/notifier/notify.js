const notify = () => {
	const audio = new Audio('./signals/notification.wav');
	audio.play();
};

export { notify };