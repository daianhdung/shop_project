
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
        <div className="layout-page d-flex align-items-center">
            <select className="btn-cart-list" value={value} onChange={(e)=>handleSort(e)}>
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