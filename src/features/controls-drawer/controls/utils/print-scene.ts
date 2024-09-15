export const printScene = (dataUrl: string) => {
  let windowContent = "<!DOCTYPE html>";
  windowContent += "<html>";
  windowContent += "<head><title>Print canvas</title></head>";
  windowContent += "<body>";
  windowContent += '<img src="' + dataUrl + '">';
  windowContent += "</body>";
  windowContent += "</html>";

  const printWin = window.open(
    "",
    "",
    "width=" + screen.availWidth + ",height=" + screen.availHeight
  )!;
  printWin.document.open();
  printWin.document.write(windowContent);

  printWin.document.addEventListener(
    "load",
    function () {
      printWin.focus();
      printWin.print();
      printWin.document.close();
      printWin.close();
    },
    true
  );
};
