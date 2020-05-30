import falcon, json, mydatabase

class StaticHTML(object):
    def on_get(self, req, resp, filename):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/html'
        with open('../demos/'+filename, 'r') as f:
            resp.body = f.read()

class StaticJS(object):
    def on_get(self, req, resp, filename):
        resp.status = falcon.HTTP_200
        resp.content_type = falcon.MEDIA_JS
        # encoding='UTF-8'
        with open('../demos/js/'+filename, 'r', encoding='UTF-8') as f: 
            resp.body = f.read()

class StaticCSS(object):
    def on_get(self, req, resp, filename):
        resp.status = falcon.HTTP_200
        resp.content_type = 'text/css'
        with open('../demos/css/'+filename, 'r') as f:
            resp.body = f.read()


class NodesResource(object):
  nodes = []
  def on_options(self, req, res):
    res.status = falcon.HTTP_200
  def on_get(self, req, resp):
    query = "SELECT * FROM nodes;"
    rows = dbms.get_all_data(query=query)
    resp.body = json.dumps([(dict(row.items())) for row in rows])
  def on_post(self, req, resp):
    body = req.stream.read()
    nodesJSON = json.loads(body.decode('utf-8'))
    dbms.execute_query("DELETE FROM nodes;")
    for node in nodesJSON:
      dbms.execute_query("INSERT INTO nodes (id, type, x, y, text, height, width, radius, theme) VALUES ({id}, '{type}', {x}, {y}, '{text}', {height}, {width}, {radius}, '{theme}');".format(id=node['id'], type=node['type'], x=node['x'], y=node["y"], text=node["text"], height = node["height"], width = node["width"], radius = node["radius"], theme = node["theme"]))
    
    resp.status = falcon.HTTP_201
    resp.body = json.dumps({"success": True})

class EdgesResource(object):
  edges = []
  def on_options(self, req, res):
    res.status = falcon.HTTP_200
  def on_get(self, req, resp):
    query = "SELECT * FROM edges;"
    rows = dbms.get_all_data(query=query)
    resp.body = json.dumps([(dict(row.items())) for row in rows])
  def on_post(self, req, resp):
    body = req.stream.read()
    edgesJSON = json.loads(body.decode('utf-8'))
    dbms.execute_query("DELETE FROM edges;")
    for edge in edgesJSON:
      dbms.execute_query("INSERT INTO edges (id, edgefrom, edgeto) VALUES ({id}, {edgefrom}, {to});".format(id=edge['id'], edgefrom=edge['from'], to=edge["to"]))
    resp.status = falcon.HTTP_201
    resp.body = json.dumps({"success": True})  

api = falcon.API()
dbms = mydatabase.MyDatabase(mydatabase.SQLITE, username='', password='', dbname='mydb.sqlite')
dbms.create_db_tables()
nodes_endpoint = NodesResource()
edges_endpoint = EdgesResource()
api.add_route('/api/nodes', nodes_endpoint)
api.add_route('/api/edges', edges_endpoint)
api.add_route('/js/{filename}', StaticJS())
api.add_route('/css/{filename}', StaticCSS())
api.add_route('/{filename}', StaticHTML())