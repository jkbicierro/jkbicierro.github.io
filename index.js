function toggleMode() {
    const body = document.body;
    body.dataset.mode = body.dataset.mode === 'light' ? 'dark' : 'light';
}