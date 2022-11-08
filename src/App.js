import './App.css';
import { Route, Routes } from "react-router-dom";
import Page from "./Routes/Page";
import NotFound from "./Routes/NotFound";
import {useEffect, useState} from "react";
import Main from "./Routes/Main";


const recursiveRoutes = [
    {
        group: "1",
        routeName: "Generales",
        subRoutes: [
            {
                routeName: "subgrupo_1",
                parentGroup: "1"
            },
            {
                routeName: "subgrupo_2",
                parentGroup: "1",
                subRoutes: [
                    {
                        routeName: "subgrupo_1",
                        parentGroup: "1"
                    },
                    {
                        routeName: "subgrupo_2",
                        parentGroup: "1"
                    }
                ]
            }
        ]
    },
    {
        group: "2",
        routeName: "RecursosHumanos"
    }
]

function App() {
    const [componentsRoutes, setComponentsRoutes] = useState([])

    const getComponentsRoutes = async (arrayRoutes) => {
        arrayRoutes.map((routeParam, index) => {
            if (routeParam?.subRoutes) {
                getComponentsRoutes(routeParam.subRoutes)
            }

            setComponentsRoutes((prevState) => (
                    [...prevState, <Route path={routeParam.routeName} element={<Page title={routeParam.routeName} key={index} />} />]
                )
            )

            return null
        })
    }

    useEffect(() => {
        getComponentsRoutes(recursiveRoutes)
            .finally(() => {
                console.log("getComponentsRoutes is a finished")
            })
    }, [])


    return (
        <Routes>
            <Route path="/" element={<Main recursiveRoutes={recursiveRoutes} />}  />
            {componentsRoutes}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
