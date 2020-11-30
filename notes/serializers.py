from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True,
        default=serializers.CurrentUserDefault()
    )
    tag = serializers.ChoiceField(choices=Note.TAG_CHOICES)

    
    class Meta:
        model = Note
        fields = ('id', 'user', 'title', 'content', 'tag', 'date_created')
