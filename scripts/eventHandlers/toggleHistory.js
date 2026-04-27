export default function (e) {
    const element = document.getElementsByTagName("aside")[0];
    if (element.style.display === "none") element.style.display = "flex";
    else element.style.display = "none";
}
