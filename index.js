const onInputChange = (event) => {
  const value = event.target.value;
  const output = window.document.getElementById("parsing-result");
  output.innerHTML = JSON.stringify(parseOcrString(value), null, 4);
}
