import { createContext, useState } from "react";

const FilterContext = createContext()



function FilterProvider({ children }) {

    const [filter, setFilter] = useState({
        searchName:"",
        brandId: [],
        sizeId: [],
        categoryId: [],
        sort: ""
    })
    const handleFilter = (newFilter) => {
        setFilter({
            ...filter,
            ...newFilter
        })
    }

    const value = {
        filter,
        handleFilter
    }

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export {FilterProvider, FilterContext}