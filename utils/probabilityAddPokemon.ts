export const probabilityAddPokemon = () => {
    const prob = 0.5
    const isSuccess = Math.random() >= prob;
    return isSuccess;
}