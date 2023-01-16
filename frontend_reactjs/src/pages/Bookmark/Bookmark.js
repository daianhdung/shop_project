import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import config from '~/config';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import * as changeService from '~/service/changeService'
import useFilter from '~/hooks/useFilter';
import useAuth from '~/hooks/useAuth';
import * as bookmarkService from '~/service/bookmarkService';
import { getCookie } from '~/utils/utilsCookie';



function Bookmark() {
  
    const filterContext = useFilter()
    const authContext = useAuth()
    const isAuth = authContext.auth
    const [current, SetCurrent] = useState(1)
    const [sort, SetSort] = useState("az")
   
    useEffect( () => {
        const token = isAuth ? getCookie('tokenJwt') : ""
        var custtom = {
            current,
            sort
        }
        var customFilter = {
            ...filterContext.filter,
            ...sort
        }
        bookmarkService.getProductBookmark( customFilter, current, token)
            .then(data => {
                console.log(data)
            })
    }, [filterContext])
    return (
        
        <div>
            
        </div>
    )
}

export default Bookmark;
