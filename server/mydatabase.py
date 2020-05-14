from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, String, MetaData, ForeignKey
# Global Variables
SQLITE                  = 'sqlite'

# Table Names
NODES = 'nodes'
EDGES = 'edges'


class MyDatabase:
    # http://docs.sqlalchemy.org/en/latest/core/engines.html
    DB_ENGINE = {
        SQLITE: 'sqlite:///{DB}'
    }

    # Main DB Connection Ref Obj
    db_engine = None
    def __init__(self, dbtype, username='', password='', dbname=''):
        dbtype = dbtype.lower()
        if dbtype in self.DB_ENGINE.keys():
            engine_url = self.DB_ENGINE[dbtype].format(DB=dbname)
            self.db_engine = create_engine(engine_url)
            print(self.db_engine)
        else:
            print("DBType is not found in DB_ENGINE")

    def create_db_tables(self):
            metadata = MetaData()
            nodes = Table(NODES, metadata,
                        Column('id', Integer, primary_key=True),
                        Column('type', String),
                        Column('x', Integer),
                        Column('y', Integer),
                        Column('text', String),
                        Column('height', Integer),
                        Column('width', Integer),
                        Column('radius', Integer)
                        )
            edges = Table(EDGES, metadata,
                        Column('id', Integer, primary_key=True),
                        Column('edgefrom', Integer, ForeignKey("nodes.id"), nullable=False ),
                        Column('edgeto', Integer, ForeignKey("nodes.id"), nullable=False)
                        )                            
            try:
                metadata.create_all(self.db_engine)
                print("Tables created")
            except Exception as e:
                print("Error occurred during Table creation!")
                print(e)

    # Insert, Update, Delete
    def execute_query(self, query=''):
            if query == '' : return
            print (query)
            with self.db_engine.connect() as connection:
                try:
                    connection.execute(query)
                except Exception as e:
                    print(e)

    def get_all_data(self, table='', query=''):
            query = query if query != '' else "SELECT * FROM '{}';".format(table)
            print(query)
            returnData = []
            with self.db_engine.connect() as connection:
                try:
                    result = connection.execute(query)
                except Exception as e:
                    print(e)
                else:    
                    for row in result:
                        print(row) # print(row[0], row[1], row[2])
                        d = dict(row.items())
                        returnData.append(d)
                    result.close()
            print("\n")
            return returnData