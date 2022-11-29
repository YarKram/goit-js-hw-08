import VimeoPlayer from "@vimeo/player";
import throttle from "lodash.throttle";

const iframe = document.querySelector("iframe");
const player = new VimeoPlayer(iframe);

const CURRENTTIME_KEY = "videoplayer-current-time";

// Отримуємо  значенння
// записуемо в сховище
const onPlay = function (data) {
	const currentTimeValue = data;

	if (currentTimeValue) {
		localStorage.setItem(CURRENTTIME_KEY, JSON.stringify(currentTimeValue));
	}
};
player.on("timeupdate", throttle(onPlay, 1000));

// Отримуємо значення із сховища

const playbackTime = localStorage.getItem(CURRENTTIME_KEY);

const seconds = playbackTime === null ? 0 : JSON.parse(playbackTime).seconds;

player
	.setCurrentTime(seconds)
	.then(function (seconds) {})
	.catch(function (error) {
		switch (error.name) {
			case "RangeError":
				// the time was less than 0 or greater than the video’s duration
				break;

			default:
				// some other error occurred
				break;
		}
	});
