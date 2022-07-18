function insertHeader() {
    header = document.createElement('div')
    header.classList.add('header')
    header.innerHTML = template

    center = document.getElementsByClassName('center')[0]
    center.prepend(header)
}

const template = `
<div class="header-left">
    <a href='/apps'><div id="icon">a</div></a>
</div>
<div class="header-right">
    Generated from <a href='https://github.com/florinpop17/app-ideas'target='_blank' rel='noopener nonreferrer'>app-ideas</a>
    <br><a href='https://github.com/Javascript-void0/apps'target='_blank' rel='noopener nonreferrer'>https://github.com/Javascript-void0/apps</a>
    <br>Website: <a href='/'>https://java.is-a.dev</a>
</div>
`