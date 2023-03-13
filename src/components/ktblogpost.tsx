/*
*	Copyright (C) 2023 Kendall Tauser
*
*	This program is free software; you can redistribute it and/or modify
*	it under the terms of the GNU General Public License as published by
*	the Free Software Foundation; either version 2 of the License, or
*	(at your option) any later version.
*
*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*	GNU General Public License for more details.
*
*	You should have received a copy of the GNU General Public License along
*	with this program; if not, write to the Free Software Foundation, Inc.,
*	51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import { useState } from "react";
import './ktblogpost.css';

export interface KTBlogPostProps {
    postId: number,
    title?: string,
    timestamp?: number,
    subtitle?: string,
    content: string,
}

function KTBlogPost(props: KTBlogPostProps) {
    const [comments, updateComments] = useState();

    let d: Date;
    if (props.timestamp != undefined) {
        d = new Date(props.timestamp);
    } else {
        d = new Date();
    }

    return (
        <li className="entry">
            {props.title != "" ? (<h1 className="title">{props.title}</h1>) : (<h1 className="title"></h1>)}
            {props.subtitle != "" ? (<h2 className="subtitle">{props.subtitle}</h2>) : (<h2 className="subtitle"></h2>)}
            {props.timestamp != undefined ? (<h4 className="timestamp">{d.toString()}</h4>) : (<h4 className="timestamp">This post has no timestamp.</h4>)}
            {props.content != "" ? (<p className="blogentry">{props.content}</p>) : (<p className="blogentry">This post has no content.</p>)}
        </li>
    )

}

export default KTBlogPost;
