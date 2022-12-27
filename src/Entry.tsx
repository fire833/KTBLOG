/*
*	Copyright (C) 2022  Kendall Tauser
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

import { useState } from 'react';
import './Entry.css';
import KTBlogPost, { KTBlogPostProps } from './components/ktblogpost';

enum blogState {
  Default = "About",
  About = "Blog Posts",
}

function KTBLOG() {

  const [entries, updateEntries] = useState(Array<KTBlogPostProps>(
    { content: "There are no blog posts yet. Please check back in later to see more content.", postId: "Default" },
    // { content: "There are no blog posts yet. Please check back in later to see more content.", postId: "Default" },
  ));

  const [pageState, updatePageState] = useState(blogState.Default);

  const entriesUpdater = () => {
    fetch("https://api.tauser.us/blog/posts").then((resp) => {
      return resp.json().then((v) => { updateEntries(v) });
    });
  }

  entriesUpdater();

  return (
    <div>
      <div className="header">
        <button onClick={() => {
          window.location.href = "https://links.tauser.us/resume"
        }} className="btn">Resume</button>
        <button onClick={() => {
          if (pageState == blogState.Default) {
            entriesUpdater();
          } else if (pageState == blogState.About) {
            // window.location.href = "mailto:kttpsy@gmail.com";
          }
        }} className="btn">{pageState == blogState.Default ? "Refresh Posts" : "Email Me!"}</button>
        <button onClick={() => {
          if (pageState == blogState.Default) {
            updatePageState(blogState.About);
          } else if (pageState == blogState.About) {
            updatePageState(blogState.Default)
          }
        }} className="btn">{pageState.toString()}</button>
      </div>
      {pageState == blogState.Default ? (
        <div className="content">
          {entries.map((entry) => (
            <KTBlogPost postId={entry.postId} title={entry.title} subtitle={entry.subtitle} timestamp={entry.timestamp} content={entry.content} />
          ))}
        </div>
      ) : (<h1></h1>)}
    </div>
  )
}

export default KTBLOG;
