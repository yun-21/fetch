const fet = fetch("https://pokeapi.co/api/v2/")
const check = async() => {
  console.log(await fet)
}
check()