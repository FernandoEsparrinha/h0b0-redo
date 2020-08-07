/**
 * Cria os arrays com as posicoes dos vertices de um poligono com n lados
 * 
 * @param {Number} n Numero de lados do poligono 
 * @param {Number} radius Raio do poligono 
 */
function createVerticesPosition(n, radius) {
    let angle = TWO_PI / n
    let index = 0
    for (let a = (TWO_PI + (PI / 2)); a >= (PI / 2); a -= angle) {
        let sx = (windowWidth / 2) + cos(a) * radius
        let sy = (windowHeight / 2) + sin(a) * radius

        verticesPosition[index] = [sx, sy]
        index++
    }
}