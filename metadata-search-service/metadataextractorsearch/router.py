from searchapi.viewsets import SearchViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('images',SearchViewSet)

def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        All non-auth models end up in this pool.
        """
        return True