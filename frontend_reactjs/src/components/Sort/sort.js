
const sortList = [

    {
        name: 'az',
        lable:"Tên: A-Z"
    },
    {
        name: 'asc',
        lable:"Giá tăng dần"
    },
    {
        name: 'dsc',
        lable:"Giá giảm dần"
    }
]

function Sort({handleSort, value}){
    return (
        <div id="wrapper">
            <select className="form-select-sm" value={value} onChange={(e)=>handleSort(e)}>
            {
                sortList.map(item=>{
                return (
                    <option value={item.name} key={item.name}>{item.lable}</option>
                )
                })
            }
            </select>
      </div>
    )
}
export default Sort