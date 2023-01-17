
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
        <div id="wrapper" className="bg-white py-4">
            <div className="w-100 h-50 p-4 rounded border border-info" style={{background: 'var(--bs-gray-200)', userSelect: 'none'}}>
                <select className="w-25 form-select-lg fs-3 wm-20" value={value} onChange={(e)=>handleSort(e)}>
                {
                    sortList.map(item=>{
                    return (
                        <option className="fs-4" value={item.name} key={item.name}>{item.lable}</option>
                    )
                    })
                }
                </select>
            </div>
      </div>
    )
}
export default Sort