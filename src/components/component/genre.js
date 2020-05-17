import React from 'react'
import {Image} from 'react-bootstrap'

export default function({id, name}) {
    return (
        <React.Fragment>
            <div className="text-center genre-card">
                <Image src={require(`../../assets/genres/${name}.png`)} alt={name} fluid className="icon-genre"/>
                <p className="">{name}</p>
            </div>
        </React.Fragment>
    )
}