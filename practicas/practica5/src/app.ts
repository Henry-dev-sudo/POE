const input = document.getElementById("inputText") as HTMLInputElement;
const normalText = document.getElementById("normal") as HTMLSpanElement;
const debounceText = document.getElementById("debounce") as HTMLSpanElement;

function debounceFunction(callback: (...args: any[]) => void, delay: number = 1000) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return (...args: any[]) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    }
}
const normalRequest = (value: string): void => {
    normalText.textContent = `${value} sugerencia`;
    console.log("Retecion normal disparada");
}
const debounceRequest = debounceFunction((value: string): void => {
    debounceText.textContent = `${value} sugerencia`;
    console.log("Retencion debounce disparada");
});

input.addEventListener('input', (e:Event) =>{
    const elemento = e.target as HTMLInputElement;

    normalRequest(elemento.value);
    debounceRequest(elemento.value);
})