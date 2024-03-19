from werkzeug.wrappers import Request, Response, ResponseStream
from models.ops import get_user_by_email, get_role_by_id, get_feature_by_id


class RBACMiddleWare():
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        request = Request(environ)
        if request.path == '/login' or request.path == '/signup' or request.method == 'OPTIONS':
            return self.app(environ, start_response)

        try:
            email = request.headers.get('X-User-Email')
            user = get_user_by_email(email)[0]
            r_id = user.fields.get('r_id')
            role = get_role_by_id(r_id)[0]
            feature_list = role.fields.get('features').split(',')
            is_allowed = False
            for feature_id in feature_list:
                if len(feature_id) > 0:
                    feature = get_feature_by_id(feature_id)[0]
                    print(feature.fields.get('name').split(' '))
                    route, method = feature.fields.get('name').split(' ')
                    if "<email>" in route:
                        new_route = route.split('<email>')[0]
                        print()
                        if new_route in request.path:
                            is_allowed = True
                            break
                    elif "<id>" in route:
                        new_route = route.split('<id>')[0]
                        if new_route in request.path:
                            is_allowed = True
                            break

                    else:
                        if request.method == method and request.path == route:
                            is_allowed = True
                            break
            if is_allowed:
                return self.app(environ, start_response)
            else:
                res = Response(u'Authorization failed',
                               mimetype='text/plain', status=401)
                return res(environ, start_response)

        except Exception as e:
            print(e)
            res = Response(u'Authorization failed',
                           mimetype='text/plain', status=401)
            return res(environ, start_response)
