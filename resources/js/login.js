window.signUpButton = document.getElementById('signUp');
window.signInButton = document.getElementById('signIn');
window.container = document.getElementById('container');

window.signUpButton.addEventListener('click', () => {
	window.container.classList.add("right-panel-active");
});

window.signInButton.addEventListener('click', () => {
	window.container.classList.remove("right-panel-active");
});
