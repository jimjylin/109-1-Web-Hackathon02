import React, { Component } from 'react';
import ReactLoading from "react-loading";
import { Fireworks } from 'fireworks/lib/react'

import "./Sudoku.css"
import Header from '../components/Header';
import Grid_9x9 from '../components/Grid_9x9';
import ScreenInputKeyBoard from '../components/ScreenInputKeyBoard'
import { problemList } from "../problems"

class Sudoku extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, // Return loading effect if this is true.
            problem: null, // Stores problem data. See "../problems/" for more information.This is the origin problem and should not be modified. This is used to distinguish the fixed numbers from the editable values
            gridValues: null,  // A 2D array storing the current values on the gameboard. You should update this when updating the game board values.
            selectedGrid: { row_index: -1, col_index: -1 }, // This objecct store the current selected grid position. Update this when a new grid is selected.
            gameBoardBorderStyle: "8px solid #000", // This stores the gameBoarderStyle and is passed to the gameboard div. Update this to have a error effect (Bonus #2).
            completeFlag: false, // Set this flag to true when you wnat to set off the firework effect.
            conflicts: [{ row_index: -1, col_index: -1 }] // The array stores all the conflicts positions triggered at this moment. Update the array whenever you needed.
        }
    }

    handle_grid_1x1_click = (row_index, col_index) => {
        // TODO
        var last_grid = document.getElementById("grid-"+String(this.state.selectedGrid.row_index)+"*"+String(this.state.selectedGrid.col_index));
        if(last_grid !== null){
            last_grid.style.backgroundColor =  "";
            last_grid.style.color =  "#6cc";
        }
        
        var grid = document.getElementById("grid-"+String(row_index)+"*"+String(col_index));
        if(typeof(this.state.gridValues[row_index][col_index]) === 'number' || (this.state.gridValues[row_index][col_index] === '0')){
            this.setState((state)=>{
                let newSelect = { row_index: row_index, col_index: col_index };
                return {selectedGrid:newSelect};
            });
            grid.style.backgroundColor =  "#333";
            grid.style.color = "#FFF";
        }
            
            
            

        
        
        // // Useful hints:
        // console.log(this.state.selectedGrid);
    }
    isValid = (num) => {
        this.setState((state)=>{
            return {conflicts: [{ row_index: -1, col_index: -1 }]};
        });
        for(let i = 0;i<9;i++){
            if(Number(this.state.gridValues[this.state.selectedGrid.row_index][i]) === num){
                this.setState((state)=>{
                    let newConflict = [];
                    if(state.conflicts[0].row_index !== -1) newConflict = state.conflicts;
                    newConflict.push({ row_index: this.state.selectedGrid.row_index, col_index: i });
                    return {conflicts: newConflict};
                });
            }
            if(Number(this.state.gridValues[i][this.state.selectedGrid.col_index]) === num){
                this.setState((state)=>{
                    let newConflict = [];
                    if(state.conflicts[0].row_index !== -1) newConflict = state.conflicts;
                    newConflict.push({ row_index: i, col_index: this.state.selectedGrid.col_index });
                    return {conflicts: newConflict};
                });
            }
        }
        var col_num = Math.floor(this.state.selectedGrid.col_index/3);
        var row_num = Math.floor(this.state.selectedGrid.row_index/3);
        
        for(let i = 0;i<3;i++){
            for(let j = 0;j<3;j++){
                if(Number(this.state.gridValues[3*row_num + i][3*col_num + j]) === num) {
                    this.setState((state)=>{
                        let newConflict = [];
                        if(state.conflicts[0].row_index !== -1) newConflict = state.conflicts;
                        newConflict.push({ row_index: 3*row_num + i, col_index: 3*col_num + j });
                        return {conflicts: newConflict};
                    });
                }
            }
        }
        if(this.state.conflicts[0].row_index !== -1) {
            this.Error();
            return false;
        }
        return true;
    }
    Error = () => {
        //this.setState({ gameBoardBorderStyle: "8px solid #E77" });
        //setTimeout(() => { this.setState({ gameBordBoarderStyle: "8px solid #333" }); }, 1000);
    }
    handleKeyDownEvent = (event) => {
        // TODO
        if(event.keyCode <= 57 && event.keyCode >= 48){
            if(event.keyCode === 48){
                var cur_grid = document.getElementById("grid-"+String(this.state.selectedGrid.row_index)+"*"+String(this.state.selectedGrid.col_index));
                if(cur_grid === null) return;
                this.setState((state)=>{
                    let new_grid = state.gridValues;
                    new_grid[this.state.selectedGrid.row_index][this.state.selectedGrid.col_index] = '0';
                    return {gridValues:new_grid};
                })
                return ;
            }
            if(!this.isValid(event.keyCode - 48)) return;
            var cur_grid = document.getElementById("grid-"+String(this.state.selectedGrid.row_index)+"*"+String(this.state.selectedGrid.col_index));
            if(cur_grid === null) return;
            this.setState((state)=>{
                let new_grid = state.gridValues;
                new_grid[this.state.selectedGrid.row_index][this.state.selectedGrid.col_index] = event.keyCode - 48;
                return {gridValues:new_grid};
            })
            //cur_grid.style.color = "#FFF";
        }
        //console.log(event.keyCode);
        // Useful hints:
        // console.log(event)
        // if (this.state.gridValues !== null && this.state.selectedGrid.row_index !== -1 && this.state.selectedGrid.col_index !== -1 && (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {}
        // if (this.state.problem.content[this.state.selectedGrid.row_index][this.state.selectedGrid.col_index] === "0") {}
    }

    handleScreenKeyboardInput = (num) => {
        // TODO
        if(num === 0){
            var cur_grid = document.getElementById("grid-"+String(this.state.selectedGrid.row_index)+"*"+String(this.state.selectedGrid.col_index));
            if(cur_grid === null) return;
            this.setState((state)=>{
                let new_grid = state.gridValues;
                new_grid[this.state.selectedGrid.row_index][this.state.selectedGrid.col_index] = '0';
                return {gridValues:new_grid};
            })
            return ;

        }
        var cur_grid = document.getElementById("grid-"+String(this.state.selectedGrid.row_index)+"*"+String(this.state.selectedGrid.col_index));
        if(cur_grid === null) return;
        this.setState((state)=>{
            let new_grid = state.gridValues;
            new_grid[this.state.selectedGrid.row_index][this.state.selectedGrid.col_index] = num;
            return {gridValues:new_grid};
        })
        
    }

    componentDidMount = () => {
        window.addEventListener('keydown', this.handleKeyDownEvent);
    }

    loadProblem = async (name) => {
        this.setState({
            loading: true,
            problem: null,
            gridValues: null,
            selectedGrid: { row_index: -1, col_index: -1 }
        });

        const problem = await require(`../problems/${name}`)
        if (problem.content !== undefined) {
            let gridValues = [];
            for (let i = 0; i < problem.content.length; i++)
                gridValues[i] = problem.content[i].slice();
            this.setState({ problem: problem, gridValues: gridValues, loading: false });
        }
    }

    extractArray(array, col_index, row_index) {
        let rt = []
        for (let i = row_index; i < row_index + 3; i++) {
            for (let j = col_index; j < col_index + 3; j++) {
                rt.push(array[i][j])
            }
        }
        return rt;
    }

    render() {
        const fxProps = {
            count: 3,
            interval: 700,
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight,
            colors: ['#cc3333', '#81C784'],
            calc: (props, i) => ({
                ...props,
                x: (i + 1) * (window.innerWidth / 3) * Math.random(),
                y: window.innerHeight * Math.random()
            })
        }
        return (
            <>
                <Header problemList={problemList} loadProblem={this.loadProblem} gridValues={this.state.gridValues} problem={this.state.problem} />
                {this.state.loading ? (<ReactLoading type={"bars"} color={"#777"} height={"40vh"} width={"40vh"} />) : (
                    <div id="game-board" className="gameBoard" style={{ border: this.state.gameBoardBorderStyle }}>
                        <div className="row">
                            <Grid_9x9 row_offset={0} col_offset={0}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 0, 0)}
                                fixedValue={this.extractArray(this.state.problem.content, 0, 0)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={0} col_offset={3}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 3, 0)}
                                fixedValue={this.extractArray(this.state.problem.content, 3, 0)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={0} col_offset={6}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 6, 0)}
                                fixedValue={this.extractArray(this.state.problem.content, 6, 0)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />
                        </div>
                        <div className="row">
                            <Grid_9x9 row_offset={3} col_offset={0}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 0, 3)}
                                fixedValue={this.extractArray(this.state.problem.content, 0, 3)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={3} col_offset={3}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 3, 3)}
                                fixedValue={this.extractArray(this.state.problem.content, 3, 3)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={3} col_offset={6}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 6, 3)}
                                fixedValue={this.extractArray(this.state.problem.content, 6, 3)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />
                        </div>
                        <div className="row">
                            <Grid_9x9 row_offset={6} col_offset={0}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 0, 6)}
                                fixedValue={this.extractArray(this.state.problem.content, 0, 6)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={6} col_offset={3}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 3, 6)}
                                fixedValue={this.extractArray(this.state.problem.content, 3, 6)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />

                            <Grid_9x9 row_offset={6} col_offset={6}
                                handle_grid_1x1_click={this.handle_grid_1x1_click}
                                value={this.extractArray(this.state.gridValues, 6, 6)}
                                fixedValue={this.extractArray(this.state.problem.content, 6, 6)}
                                selectedGrid={this.state.selectedGrid}
                                conflicts={this.state.conflicts} />
                        </div>
                    </div>
                )}
                {this.state.completeFlag ? (<Fireworks {...fxProps} />) : null}
                {this.state.loading ? null : (<ScreenInputKeyBoard handleScreenKeyboardInput={this.handleScreenKeyboardInput} />)}
            </>
        );
    }
}

export default Sudoku;