import React from 'react'

class SocmedBar extends React.Component {
  render () {
    return(
      <div className="p-2">
        <div className="text-info border-bottom pb-2">Follow us!</div>
        <div class="fb-page" data-href="https://web.facebook.com/Indonesia.AO/"
              data-tabs=""
              data-width=""
              data-height=""
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
          >
            <blockquote cite="https://web.facebook.com/Indonesia.AO/" class="fb-xfbml-parse-ignore">
              <a href="https://web.facebook.com/Indonesia.AO/">Atlantica Online Indonesia ( Official )</a>
            </blockquote>
        </div>
      </div>
    )
  }
}

export default SocmedBar;
