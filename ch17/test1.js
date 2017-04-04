function sanitizeATag(aTag) {
    // 取得部份的標籤
    const parts = aTag.match(/<a\s+(.*?)>(.*?)<\/a>/i);
    // parts[1]是開頭的<a>標籤的屬性
    // parts[2]是介於<a>與</a>標籤之間的東西
    const attributes = parts[1].split(/\s+/); // 拆解成獨立的屬性
    return '<a ' +
        attributes
            .filter(attr =>
                /^(?:class|id|href)[\s=]/i.test(attr)).join(' ') +
        '>' +
        parts[2] +
        '</a>';
}

const html =
   `<a class="foo" href="/foo" id="foo">Foo</a>\n` +
   `<A href='/foo' class="foo">Foo</a>\n` +
   `<a href="/foo">Foo</a>\n` +
   `<a onclick="javascript:alert('foo!')" href="/foo">Foo</a>`;

html.replace(/<a .*?>(.*?)<\/a>/ig, function(m, g1, offset) {
  console.log(`<a> tag found at ${offset}. contents: ${g1}`);
});

html.replace(/<a .*?>(.*?)<\/a>/ig, function(m, g1, offset) {
  return sanitizeATag(m);
});