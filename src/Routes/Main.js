import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Main({ recursiveRoutes }) {
    const [elementsNavbar, setElementsNavbar] = useState([])
    const getElementsNavbar = (arrayRoutes, margin) => {
        arrayRoutes.map((routeParam, index) => {
            // Primero colocamos la ruta principal
            setElementsNavbar((prevState) => (
                    [
                        ...prevState,
                        <li  style={{marginLeft: margin}} >
                            <Link to={routeParam.routeName}>{routeParam.routeName}</Link>
                        </li>
                    ]
                )
            )
            // Después comprobamos si tiene submodulos
            if (routeParam?.subRoutes) {
                getElementsNavbar(routeParam.subRoutes, margin + 10)
            }


            return null
        })
    }

    useEffect(() => {
        setElementsNavbar([])
        getElementsNavbar(recursiveRoutes, 0)
    }, [])


    return (
        <ul>
            {elementsNavbar}
        </ul>
    )
}