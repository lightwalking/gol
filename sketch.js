var gen;
var nextGen;
var res = 10;
var cols;
var rows;

function setup()
{
    createCanvas(1200,600);
    cols = width / res;
    rows = height / res;
    gen = make2Dgrid(cols, rows);
    init2Dgrid(gen);
    nextGen = make2Dgrid(cols, rows);
}

function draw()
{
    drawGen();
    computeGen();
}

function drawGen()
{
    background(0);
    for (let i=0; i<cols; i++)
    {
        for (let j=0; j<rows; j++)
        {
            if (gen[i][j] == 1)
            {
                fill(255);
                stroke(0);
                let x = i * res;
                let y = j * res;
                rect(x, y, res-1, res-1);
            }
        }
    }
}

function computeGen()
{
    for (let i=0; i<cols; i++)
    {
        for (let j=0; j<rows; j++)
        {
            let state = gen[i][j];
            let neighbors = countNeighbors(gen, i, j);
            if ( state == 0 && neighbors == 3 )
            {
                state = 1;
            }
            else if ( state == 1 && (neighbors < 2 || neighbors > 3) )
            {
                state = 0;
            }
            nextGen[i][j]=state;
        }
    }
    let prevGen = gen;
    gen = nextGen;
    nextGen = prevGen;
}

function countNeighbors(grid, x, y)
{
    let sum = -grid[x][y];
    for (let i=-1;i<2;i++)
    {
        for (let j=-1;j<2;j++)
        {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    return sum;
}

function init2Dgrid(grid)
{
    for (let i=0; i<cols; i++)
    {
        for (let j=0; j<rows; j++)
        {
            grid[i][j]=floor(random(2));
        }
    }
}

function make2Dgrid(cols, rows)
{
    let grid = new Array(cols);
    for (let i=0; i<cols; i++)
    {
        grid[i]= new Array(rows);
    }
    return grid;
}
