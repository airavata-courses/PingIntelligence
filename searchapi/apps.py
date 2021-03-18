from django.apps import AppConfig


class SearchapiConfig(AppConfig):
    name = 'searchapi'

# @register_consumer
# def build_metdata():
#     # consumer = Consumer('metadata')
#     consumer.register(MetadataSerializer)
#     return consumer