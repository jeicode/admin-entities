


const SaveItemInlocalStg = (name:string, data:any[]) => localStorage.setItem(name, JSON.stringify(data))

const RemoveItemStg = (name:string) => localStorage.removeItem(name)

const ExistItemInLocalStg = (name :string) => {
    const item = localStorage.getItem(name) || null
    return item !== null
}


const GetItemLocalStg = (name: string) => {
    if (ExistItemInLocalStg(name)){
        let data = JSON.parse(localStorage.getItem(name) || "") 
        return data
    }
    return null
    
}






export {SaveItemInlocalStg, GetItemLocalStg, RemoveItemStg}