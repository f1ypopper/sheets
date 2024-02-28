use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Sheet{
    nrows: usize,
    ncols: usize,
    data: Vec<Vec<String>>,
}

#[wasm_bindgen]
impl Sheet{

    #[wasm_bindgen(constructor)]
    pub fn new(nrows: usize, ncols: usize)->Self{
        Self{nrows, ncols, data: vec![vec![String::new(); ncols]; nrows]}
    }

    pub fn get(&self, row: usize, col: usize) -> Option<String>{
        self.data.get(row).and_then(|column| column.get(col).cloned())
    }

    pub fn put(&mut self, row: usize, col: usize, value: String)->Result<(), String>{
        if row >= self.nrows{
            Err(String::from("Row out of bounds"))
        }else if col >= self.ncols{
            Err(String::from("Column out of bounds"))
        }else{
            self.data[row][col] = value;
            Ok(())
        }
    }

    pub fn nrows(&self)->usize{
        self.nrows
    }

    pub fn ncols(&self)->usize{
        self.ncols
    }
}
