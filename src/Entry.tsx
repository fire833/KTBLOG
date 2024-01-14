/*
*	Copyright (C) 2024 Kendall Tauser
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
import KTAbout from './components/ktabout';

enum blogState {
  Default = "About",
  About = "Blog Posts",
}

function KTBLOG() {

  const [entries, updateEntries] = useState(Array<KTBlogPostProps>(
    { content: "There are no blog posts yet. Please check back in later to see more content.", postId: 1, title: "Basic title", subtitle: "Subtitle goes here", timestamp: Date.now() },
    // { content: "There are no blog posts yet. Please check back in later to see more content.", postId: 2, title: "Basic title", subtitle: "Subtitle goes here", timestamp: Date.now() },
    // { content: "There are no blog posts yet. Please check back in later to see more content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", postId: 3, title: "Basic title", subtitle: "Subtitle goes here", timestamp: Date.now() },
    // { content: "There are no blog posts yet. Please check back in later to see more content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", postId: 4, title: "Basic title", subtitle: "Subtitle goes here", timestamp: Date.now() },
    // { content: "There are no blog posts yet. Please check back in later to see more content.", postId: 5, title: "Basic title", subtitle: "Subtitle goes here", timestamp: Date.now() },
    // { content: "There are no blog posts yet. Please check back in later to see more content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", postId: 6, title: "Basic title", subtitle: "Subtitle goes here", timestamp: Date.now() },
    // { content: "There are no blog posts yet. Please check back in later to see more content.", postId: 7, title: "Basic title", subtitle: "Subtitle goes here", timestamp: Date.now() },
  ));

  const [pageState, updatePageState] = useState(blogState.Default);

  const entriesUpdater = () => {
    fetch("https://api.tauser.us/blog/blogpost").then((resp) => {
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
        <ul className="content">
          {entries.map((entry) => (
            <KTBlogPost postId={entry.postId} title={entry.title} subtitle={entry.subtitle} timestamp={entry.timestamp} content={entry.content} />
          ))}
        </ul>
      ) : (
        <div className="content">
          <KTAbout />
        </div>
      )}
    </div>
  )
}

export default KTBLOG;
