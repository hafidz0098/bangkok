import json, os
R = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(R, 'index.src.html'), encoding='utf-8').read()
data = json.load(open(os.path.join(R, 'data.json'), encoding='utf-8'))
open(os.path.join(R, 'index.html'), 'w', encoding='utf-8').write(src.replace('/*__DATA__*/null', json.dumps(data, ensure_ascii=False, separators=(',', ':'))))
print('index.html ok')
